import NasaLib from '../controllers';

export default (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the NasaLib API!',
    }));
}