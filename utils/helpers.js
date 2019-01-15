const lib = require('../lib');
const env = require('../env');



const deepFind = function (obj, pathStr) {
  let path = pathStr.split('.');
  let len = path.length;
  for (let i = 0; i < len; i++) {
    if (typeof obj === 'undefined') {
      if (path[i - 1] && path[i - 1][0] === '?') {
        return undefined;
      } else {
        let err = new Error(`Bad request: request.${pathStr} is not found at '${path[i - 1]}'`);
        err.status = 400;
        throw (err);
      }
    }
    obj = obj[(path[i][0] === '?') ? path[i].substring(1) : path[i]];
  }
  return obj;
};


const apiResponse = (className, functionName, adminOnly = false, reqFuncs = [], accessLevels) => {

  let args = Array.prototype.slice.call(arguments, 5);


  return async (req, res) => {
    // (req.jwtToken ? personModel.jwtStrategy(req, adminOnly) : Promise.resolve())
    (Promise.resolve())
    .then(() => {
        // if (adminOnly)
        //   return lib.Agent.accessCheck(accessLevels, req.user, req.test);
        // else
        return Promise.resolve();
      })

      .then(rs => {
        // if (adminOnly && (!rs || rs.length < 1))
        //   return Promise.reject(error.adminOnly);
        // else {
        let dynamicArgs = [];
        for (let i in reqFuncs)
          dynamicArgs.push((typeof reqFuncs[i] === 'function') ? reqFuncs[i](req) : deepFind(req, reqFuncs[i]));

        let allArgs = dynamicArgs.concat(args);

        for (cn in lib)
          lib[cn].test = req.test;

        let isStaticFunction = typeof lib[className][functionName] === 'function';
        let model = isStaticFunction ? lib[className] : new lib[className](req.test);
        return model[functionName].apply(isStaticFunction ? null : model, allArgs);
        // }
      })
      .then(data => {
        res.status(200)
          .json(data);
      })
      .catch(err => {
        console.log(`${className}/${functionName}: `, req.app.get('env') === 'development' ? err : err.message);
        res.status(err.status || 500)
          .send(err.message || err);
      });
  }
}



const apiTestURL = (url) => `${env.app_address}:${env.app_port}/api/${url}?test=tEsT`;




module.exports = {
  apiResponse,
  apiTestURL
}