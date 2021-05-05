import Fetch, { TFetchOptions } from 'Server/fetch/Fetch';
import Cookies from 'Server/fetch/Cookies';

const userRoutes = (app, json, url, serverUrl) => {
  app.put(`${url}/profile`, json, (req, res) => {
    if (!req.body) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const profileOptions: TFetchOptions<unknown> = {
      data: req.body,
      headers: {
        Cookie: Cookies.getCookies(req),
      },
    };
    const serverAddress = `${serverUrl}/profile`;
    Fetch.put(serverAddress, profileOptions)
      .then(async (answer) => {
        res.status(200).send(await answer.json());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  });

  app.put(`${url}/password`, json, (req, res) => {
    if (!req.body) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const profileOptions: TFetchOptions<unknown> = {
      data: req.body,
      headers: {
        Cookie: Cookies.getCookies(req),
      },
    };
    const serverAddress = `${serverUrl}/password`;
    Fetch.put(serverAddress, profileOptions)
      .then(async (answer) => {
        res.status(200).send(await answer.json());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  });

  app.put(`${url}/profile/avatar`, json, (req, res) => {
    if (!req.body) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const avatarOptions: TFetchOptions<unknown> = {
      data: req.body,
      headers: {
        Cookie: Cookies.getCookies(req),
      },
    };
    const serverAddress = `${serverUrl}/profile/avatar`;
    Fetch.put(serverAddress, avatarOptions)
      .then(async (answer) => {
        res.status(200).send(await answer.json());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  });

  app.get(`${url}/:id`, json, (req, res) => {
    const id = req.params?.id;
    if (!id) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const getInfo: TFetchOptions<unknown> = {
      headers: {
        Cookie: Cookies.getCookies(req),
      },
    };
    const serverAddress = `${serverUrl}/profile/avatar`;
    Fetch.put(serverAddress, getInfo)
      .then(async (answer) => {
        res.status(200).send(await answer.json());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  });
};

export default userRoutes;
