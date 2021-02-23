const useData = require("../data/uses-data");

function list(req, res, next) {
  res.json({ data: useData });
}

//read

function usesExists(req, res, next) {
  let useId = Number(req.params.useId);
  if (useId) {
    results = useData.find((use) => use.id === useId);
    if (results) {
      res.locals.found = results;
      next();
    }
  }

  next({
    status: 404,
    message: "use not found",
  });
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.found });
  // returning url by id / get url
}

// delete
function destroy(req, res) {
  const { useId } = req.params;
  const index = useData.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    useData.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [usesExists, read],
  delete: destroy,
};
