
# Hagglex Assessment

A service that parses a URL and returns meta-data from that web page. Data include - The title, description and largest image on that webpage.

Also withh cached details of a webpage so that you don't have to visit a webpage repeatedly within a short space of time.

Using NestJS and GraphQL, Redis, Puppeeter. 

The Application is Dockerised and can be spun up, with docker compose up.
## Demo

https://limitless-spire-47854.herokuapp.com/graphql

  
## Installation 


```bash 
  git clone "https://github.com/oluwadamilarey/hagglex.git"
  cd hagglex
  docker-compose up
```
    
## API Reference

#### Demo Get webpage info from www.w3schools.com

```http
  {
    getPage{
        PageTitle
        Description
        LargestImage
    }
  }
```



#### Get Page Info with Url

```http
  {
    getPage(url: "www.hagglex.com"){
        PageTitle
        Description
        LargestImage
    }
  }
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Required**. url of pageinfo to fetch |



  