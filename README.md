# Trade It

## Overview

Trade It is a full-stack bartering web platform developed by Team 17 during the FAF.BDA21.1 course at the Technical University of Moldova. As interns at Dev IT Consulting, our goal was to create a platform that simplifies item exchange among users.

This is the front-end repository of the project. It contains the source code of the web application, developed using Next.js and TypeScript.

For more information about the project, refer to the [main repository](https://github.com/danielavornic/trade-it).

## Installation

Before running the application, make sure the server is running. For more information, refer to the [server repository](https://github.com/qopas/tradeIT).

1. Clone the repository
2. Install dependencies using `npm install`
3. Add a `.env.local` file in the root directory of the project with the following content:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/
NEXT_PUBLIC_MINIO_BASE_URL=http://localhost:9000
```

`NEXT_PUBLIC_API_BASE_URL` is the base URL of the API, while `NEXT_PUBLIC_MINIO_BASE_URL` is the base URL of the MinIO server.
Set the IP addresses and ports according to your configuration.

4. Run the development server using `npm run dev`

## Usage

The application is available at [http://localhost:3000](http://localhost:3000).
