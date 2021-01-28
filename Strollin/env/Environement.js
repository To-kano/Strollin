const environement = {
    Client_ID: '6abfd5936448c09',
    Base_Auth: 'https://api.imgur.com/oauth2/authorize?client_id=6abfd5936448c09&response_type=token'
  };

  exports.environement = environement;

  const IP_SERVER = process.env.IP_SERVER || '88.165.45.219';

  exports.IP_SERVER = IP_SERVER;

  const PORT_SERVER = process.env.PORT_SERVER || '3000';//3003 pour Tony

  exports.PORT_SERVER = PORT_SERVER;
