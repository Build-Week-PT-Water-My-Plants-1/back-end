# back-end


|Base URL for Deployed API| https://watercan-io-bw.herokuapp.com/

|Endpoints|
| Request | URL                  | Description                                           |
|---------|----------------------|-------------------------------------------------------|
| GET     | /                    | get status of api if up                               |
| POST    | api/auth/register    | register as a new user                                |
| POST    | api/auth/login       | login as an existing user                             |
| GET     | api/plants           | get all plants                                        |
| GET     | api/plants/:id       | get all plants where id is user_id                    |
| POST    | api/plants/:id       | create a new plant where id is user_id                |
| PUT     | api/plants/:id       | update an existing plant where id is id               |
| DELETE  | api/plants/:id       | delete an existing plant where id is id               |

Table Requirements

Users
| Name          | Type    | Required | Unique | Notes                         |
|---------------|---------|----------|--------|-------------------------------|
| id            | integer | yes      | yes    | users id (auto generated)     |
| username      | string  | yes      | yes    | users username                |
| password      | string  | yes      | no     | users password                |
| phonenumber   | string  | yes      | yes    | users password                |

Plants
| Name          | Type    | Required | Unique | Notes                                           |
|---------------|---------|----------|--------|-------------------------------------------------|
| id            | integer | yes      | yes    | plants id (auto generated)                      |
| user_id       | integer | yes      | no     | user id - foreign key                           |
| nickname      | string  | yes      | no     | nickname of specific plant                      |
| species       | string  | yes      | no     | species of specific plant                       |
| h2ofrequency  | string  | yes      | no     | how often to water the plant                    |