# Todo

This is a simple Todo List Manager built with Node.js, Express, and SQL.

## Features

- List all tasks
- View one task
- Create new tasks with a title, description, status, deadline and optional comment, responsible and tags
- Update task details
- Delete tasks

## Installation

1. Clone the repository: `git clone https://github.com/LedezmaG/Todo-back.git`
2. Navigate to the project directory: `cd todoback`
3. Install dependencies: `npm install`
4. Set up your SQL database and update the connection details in `.env`
5. Run the application: `npm start`

## Usage

Once the application is up and running, you can access it in your web browser at `http://localhost:8080`. Here are the available routes:

### Tasks

- `/tasks` (GET): Get a list of all tasks,
Example: `/tasks?limit=10&offset=0` will return the first 10 tasks.
- `/tasks/:id` (GET): Get details of a specific task
- `/tasks` (POST): Create a new task
- `/tasks` (PUT): Update details of a specific task
- `/tasks/:id` (DELETE): Delete a specific task

### Users

- `/users` (GET): Get a list of all the users
Example: `/users?limit=10&offset=0` will return the first 10 tasks.
- `/users/:id` (GET): Get details of a specific user
- `/users` (POST): Create a new users
- `/users` (PUT): Update details of specific users
- `/users/:id` (DELETE): Delete a specific users

### Roles

- `/roles` (GET): Get a list of all roles
Example: `/roles?limit=10&offset=0` will return the first 10 tasks.
- `/roles/:id` (GET): Get details of a specific role
- `/roles` (POST): Create new roles
- `/roles` (PUT): Update details of specific roles
- `/roles/:id` (DELETE): Delete specific roles

## Database Schema

The application uses a SQL database to store tasks. The following schema is used:

```sql
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT current_timestamp(),
  `active` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `roles` (`id`, `name`, `description`, `created`, `updated`, `active`) VALUES
(1, 'Admin', 'User with all access at the platform', '2023-05-16 18:58:47', '2023-05-16 18:58:47', 1),
(2, 'User', 'User with restricted access', '2023-05-16 18:58:47', '2023-05-17 01:01:45', 1);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_role` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT current_timestamp(),
  `active` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `id_role`, `name`, `username`, `created`, `updated`, `active`) VALUES
(1, 1, 'Ernesto Adan', 'Admin', '2023-05-16 18:59:38', '2023-05-16 18:59:38', 1),
(2, 2, 'Borja Aguilera', 'User_1', '2023-05-16 18:59:39', '2023-05-16 18:59:39', 1),
(3, 2, 'Adelina Velez', 'User_2', '2023-05-16 18:59:39', '2023-05-16 18:59:39', 1);

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(45) NOT NULL,
  `deadline` date NOT NULL,
  `comment` text DEFAULT NULL,
  `responsible` varchar(45) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT current_timestamp(),
  `active` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tasks` (`id`, `id_user`, `title`, `description`, `status`, `deadline`, `comment`, `responsible`, `tags`, `created`, `updated`, `active`) VALUES
(1, 1, 'Example', 'This is another example', 'pending', '2023-05-25', 'This is a very important task ', 'David', 'Urgent', '2023-05-16 19:02:55', '2023-05-17 01:03:34', 1),
(2, 1, 'Example 2', 'This is another example', 'pending', '2023-05-26', 'This is a very important task ', 'Israel', 'Urgent', '2023-05-16 19:03:01', '2023-05-16 19:03:01', 1),
(3, 1, 'Example 3', 'This is another example', 'pending', '2023-05-26', 'This is a very important task ', 'Israel', 'Urgent', '2023-05-16 19:03:05', '2023-05-17 01:03:51', 0);
```
