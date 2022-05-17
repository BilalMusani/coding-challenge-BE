## Folder Structure

```
| api
│ ├─ src
|    ├─ controllers                  
|      jobs.controller.ts		# Controller for event handling when job is updated (i.e. Basic Task)
|    ├─ generated # Automatically generated typings
|    ├─ queries # Contains GraphQl queries used in the app
|       └─ users.queries.ts
|       └─ jobs.queries.ts
|    ├─ routes # Contains routes to controllers and the relevant routers
|       └─ job.routes.ts
|       └─ jobs.urls.ts
|       └─ user.routes.ts      
|    ├─ services # Contains services for mailing and managing business logic for the job controller
|       └─ jobs.service.ts
|       └─ jobs.urls.ts
|    ├─ utils # Contains utilities for the app
|       ├─ errors # Contains classes for encapsulating error logic
|       ├─ handlers
|           └─ error.handler.ts # Handler for delegating of errors
```

* * *
## Task
The **Personal Job Alert service** provider by this app has two modes of operation:

1. If user has property ```send_digest=False```, the user will be notified on a per job basis provided that the added job is present in the user's preferred location and has the relevant keywords in the tile.

2. Users who have ```send_digest=True``` will receive an email comprising of all jobs that match their specified criteria posted in the 24 hour period from the server's defined polling value.
* * *
## Implementation

### Keywords
- Keywords are defined in a specified keywords table.
- Since one keyword can be applicable to multiple users, the ```Keywords``` table and the ```Users``` table have a **many-to-many** mapping via the ```user_to_keywords``` table. 

### Events and Triggers
- For **per job emailing**, the trigger is only initiated if the **title** and/or **city** is modified.
- For digests, the ```date_added``` field for the ```Jobs``` table is only updated when the **title** and/or **city** is modified (which thereffore means that these jobs will be picked up in the polling process).
- A ```title_lexeme``` which is a vectorized representation is automatically generated/updated whenever a job is updated.

## Schema Modifications

The following tables and fields have been added. In case only a field is added, only the added/modified fields are displayed below:

### Tables
#### Users

| Column  | Type  | 
| - | - |
| send_digest | boolean |

#### Jobs
| Column  | Type  | 
| - | - |
| title_lexeme | tsvector, nullable, default: to_tsvector('english'::regconfig, title)|
| date_added | timestamp without time zone, nullable, default: now() |
#### Keywords

| Column  | Type  | 
| - | - |
| id | integer  primary key, unique, default: next ('keywords_id_seq'::regclass)|
| keyword |  text |

#### User_To_Keywords
| Column  | Type  | 
| - | - |
| user_id | integer|
| keyword_id | integer |
| id | integer |

### Views And Functions
#### Get_Users_Matching_Job (Function)
- See implementation in Hasura console

&nbsp;
#### Get_Users_Advanced (View)
| Column  | Type  | 
| - | - |
| id | integer |
| email | text |
| city | text |
| job_title | text |
| job_id | integer |
| date_added | timestamp without timezone |
| investor_name | text |
| company_name | text |

* * *
## How to run the project

First, you must populate the following parameters in the docker compose file

```Docker
- SMTP_PASSWORD=<sendgrid api key>
- SMTP_HOST=smtp.sendgrid.net
- SENDER_ADDRESS=<email address of your choosing>
- EMAIL_SCHEDULE=* 18 * * * # Determines the polling rate for the digest mailing service.
```

* The app has been tested using [SendGrid](https://app.sendgrid.com) for delegating the mailing process and [MailSlurp](https://app.mailslurp.com/) for providing the sender email.
   - For setting up SendGrid for this app, refer to this [document](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api).

### Start App
- `docker-compose up --build`
- This will start the:
   1. React app on port 8000.
   2. Hasura on port 8080.
   3. The nodejs express api on port 5001.
