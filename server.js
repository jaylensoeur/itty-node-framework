import Bootstrap from './bootstrap';

const server = Bootstrap.begin();
server.listen(server.get('port'), () => {
    console.log(`${server.get('express_startup_message')}`);
});