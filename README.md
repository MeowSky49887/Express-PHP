<!-- Make sure you edit doc/README.hbs rather than README.md because the latter is auto-generated -->

express-php
==============

> Node module that allows you to use PHP code as express template engine.

*This module only supports Windows (Tested on Windows 10)*

Installation
------------

Install `express-php` by running:

```sh
$ npm install --save https://github.com/MeowSky49887/Express-PHP.git
```

Documentation
-------------

**Example**

```js
const express = require("express");
const path = require("path");
const php = require("express-php");

const app = express();

app.engine("php", php);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "php");

app.get("/", (req, res) => {
    res.render("index", { Hello: "World!" });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

```php
<!DOCTYPE html>
<html>
<head>
    <title>Express + PHP</title>
</head>
<body>
    <h1>Express + PHP</h1>
    <p>Hello: <?php echo $_NODEJS["Hello"] ?? "No Value"; ?></p>
</body>
</html>
```
