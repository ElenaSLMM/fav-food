# IronFood web

Project 2 for Ironhack Bootcamp

Backend and Frontend development using authentication, Google Maps and Google Places API's, remote data base with Mongo and deployed to Heroku.

## Endpoints table


Id // Method // Path                                    //  Description
----------------------------------------------------------------------------------------------------------
1       get     /                                           Muestra la home page. Index.
2       get     /api                                        Llamada a la API de Google para solicitar los datos.
3       post    /seach                                      Funcionalidad de la barra de búsqueda para filtrar resultados.
4       get     /restaurants/list                           Muestra la lista de restaurantes.
5       get     /restaurants/:id                            Muestra detalles del restaurante.
6       get     /restaurants/favs                           Muestra la lista de restaurantes favoritos.
7       post    /restaurants/favs/add/:id                   Añade un restaurante a la lista de favoritos.
8       get     /restaurants/favs/delete?id=xxx             Elimina restaurante de la lista de favoritos.
9       get     /restaurants/wish                           Muestra la lista de restaurantes que quiero visitar.
10      post    /restaurants/wish/add/:id                   Añade un restaurante a la lista de pendientes de visitar.
11      get     /restaurants/reviews                        Muestra las opiniones dejadas en los restaurantes.
12      get     /restaurants/review/:id                     Muestra formulario para dejar una opinión del sitio.
13      post    /restaurants/review/:id                     Envía opinión del sitio a la BBDD.
14      get     /restaurants/review/delete?id=xxx           Elimina review del restaurante.
15      get     /restaurants/route/:id                      Muestra la ruta al restaurante
16      get     /user/signup                                Muestra el formulario de registro de usuario.
17      post    /user/signup                                Añade en la BBDD el usuario registrado.
18      get     /user/login                                 Muestra el formulario para editar una montaña rusa
19      post    /user/login                                 Envía formulario de login a la BBDD.
20      get     /user/profile                               Mostrar perfil de usuario.
21      get     /user/profile/edit/:id                      Muestra formulario para editar perfil de  usuario.
22      post    /user/profile/edit/:id                      Edita la información de usuario en la BBDD.
23      get     /user/logout                                Cierra sesión de usuario.




### Developed by Elena Sánchez and Miguel Serrano.












