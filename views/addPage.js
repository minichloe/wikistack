const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div>
      <label for="name">Your Name:</label>
      <input id="name" type="text" name="name">
    </div>

    <div>
      <label for="email">Your E-mail:</label>
      <input id="email" type="text" name="email">
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title: </label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>
      <label for="content">Article: </label>
      <input id="content" type="text" name="content">
    </div>

    <div>
      <label for="status">Status: </label>
      <input id="status" type="radio" name="status" value="open"><label for="open">Open</label>
      <input id="status" type="radio" name="status" value="close"><label for="close">Close</label>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>

  </form>
`);
