# Express PHP

---

## ✅ **1. โครงสร้างไฟล์**
```
/project
│── /views/          # ไฟล์ PHP Template
│   ├── index.php    # แสดงค่าจาก Node.js
│── index.js         # Express Server
│── renderer.js      # PHP Renderer
│── helper.php       # ฟังก์ชันช่วยเหลือ PHP
```

---

## ✅ **2. `index.js` (Express Server)**
```javascript
const express = require("express");
const path = require("path");
const renderPHP = require("./renderer");

const app = express();

// 🏷️ ใช้ PHP เป็น View Engine
app.engine("php", renderPHP);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "php");

// 📌 Route หลัก (ส่งค่า Hello = "World!")
app.get("/", (req, res) => {
    res.render("index", { Hello: "World!" });
});

// 📌 เริ่ม Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

---

## ✅ **3. `renderer.js` (PHP Renderer)**
```javascript
const { exec } = require("child_process");
const path = require("path");

const helperPath = path.resolve(__dirname, "helper.php");

module.exports = (filePath, options, callback) => {
    const phpFile = path.resolve(filePath);
    const data = JSON.stringify(options || {});

    exec(`php -d auto_prepend_file=${helperPath} ${phpFile} '${data}'`, (err, stdout) => {
        if (err) return callback(err);
        callback(null, stdout);
    });
};
```

---

## ✅ **4. `helper.php` (PHP Helper)**
```php
<?php
session_start();

if (isset($_COOKIE["PHPSESSID"])) {
    session_id($_COOKIE["PHPSESSID"]);
}

$nodejs = json_decode($argv[1] ?? '{}', true);

foreach ($nodejs as $key => $value) {
    $nodejs[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
```
✅ **ค่า `$nodejs["Hello"]` ถูก Escape อัตโนมัติแล้ว**  

---

## ✅ **5. `views/index.php` (แสดงค่าจาก Node.js)**
```php
<!DOCTYPE html>
<html>
<head>
    <title>Express + PHP</title>
</head>
<body>
    <h1>Express + PHP</h1>
    <p>Hello: <?= $nodejs["Hello"] ?? "No Value"; ?></p>
</body>
</html>
```
