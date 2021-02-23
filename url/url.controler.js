const urls = require("../data/urls-data");
const useData = require("../data/uses-data");

function list(req, res, next) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  let urlId = Number(req.params.urlId);
  results = urls.find((url) => url.id === urlId);
  if (results) {
    res.locals.found = results;

    next();
  }

  next({
    status: 404,
    message: ` not found: ${req.params.urlId}`,
  });
}

function read(req, res, next) {
  let newSearch = {
    id: useData.length + 1,
    time: new Date().getTime(),
    urlId: Number(req.params.urlId),
  };

  useData.push(newSearch);

  res.status(200).json({ data: res.locals.found });
  // returning url by id / get url
}

// post
function hasText(req, res, next) {
  console.log("executed has text");
  const { data: { href } = {} } = req.body;

  if (href) {
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

function create(req, res) {
  console.log("executed create");
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}
// update

function update(req, res) {
  console.log(urls, "the urls are here ");
  const result = urls.find((url) => url.id === Number(req.params.urlId));

  const { data: { href } = {} } = req.body;

  result.href = href;

  res.json({ data: result });
}

//delete

// function destroy(req, res) {
//   const urlId = Number(req.params.urlId);
//   console.log(urlId);
//   const index = urls.findIndex((url) => url.id === Number(urlId));
//   if (index > -1) {
//     urls.splice(index, 1);

//     return res.sendStatus(204);
//   }
//   res.sendStatus(405);
// }

module.exports = {
  list,
  read: [urlExists, read],
  create: [hasText, create],
  update: [urlExists, hasText, update],
  urlExists,
  //delete: [destroy],
};
