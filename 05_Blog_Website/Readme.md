# 05_Blog_Website 

This is a blog website with a minimalistic design. It has a header with a navbar with a brand, and in the bootom, it has a sticky footer. The middle part consists of the actual content of the blog and will include the snippets (up to 100 characters long) of posts, and each of the posts will have a "read more" link that can redirect the user to the post detail view with the full text where you can read them independently. Posts will be listed in chronological order. The blog website consists of the home page, about page, and contact page, which can be accessed from the navbar, as well as a hidden route '/compose' that is used for creating posts. Everything is generated using EJS partials. The website is fully mobile-responsive. It was developed with Node.js and Express.js on the backend and CSS and Bootstrap 5.3 on the frontend. 

---

Useful Links:
 
Express.js</br>
https://expressjs.com/</br>

Express.js parameters and routing</br>
https://expressjs.com/en/guide/routing.html</br>

Node.js</br>
https://nodejs.org/en/docs/</br>

body-parser from Node.js</br>
https://www.npmjs.com/package/body-parser</br>

dotenv</br>
https://www.npmjs.com/package/dotenv</br>

nodemon</br>
https://www.npmjs.com/package/nodemon</br>

templating with EJS</br>
https://ejs.co/#promo</br>
https://github.com/mde/ejs/wiki/Using-EJS-with-Express</br>

lodash</br>
https://lodash.com/</br>

---

**Example views from the website:**</br>
</br>


![Screenshot](docs/img/01_img.png)</br>


![Screenshot](docs/img/02_img.png)</br>


![Screenshot](docs/img/03_img.png)</br>


![Screenshot](docs/img/04_img.png)</br>


![Screenshot](docs/img/05_img.png)</br>


![Screenshot](docs/img/06_img.png)</br>

---

**The program was developed using Node.js, Express.js with routing, EJS, JavaScript, HTML, CSS, Bootstrap 5.3, lodash**

---

Steps required to run the server/web application:</br>
1. Use 'npm install' command to install the dependencies from package.json.</br>
2. Start the server file app.js with the command **node app.js** or **nodemon app.js** if you wish to enable automatic server reloading after detecting file changes.</br>
3. Open your web browser and navigate to localhost:3000, where the website will be live.</br>
