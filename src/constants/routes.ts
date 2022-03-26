const routes = {
  home: '/',

  notFound: '/404',

  launches: {
    show: (id: number | string) => `/launches/${id}`,
    list: '/launches',
  },
};

export default routes;
