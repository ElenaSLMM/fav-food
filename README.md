# IronFood web

Project 2 for Ironhack Bootcamp

Backend and Frontend development using authentication, Google Maps and Google Places API's, remote data base with Mongo and deployed to Heroku.

## Endpoints table


Id // Method // Path                                    //  Description
----------------------------------------------------------------------------------------------------------
1       get     /                                           Muestra la home page. Index.
2       get     /restaurants/list                           Muestra la lista de restaurantes.
3       get     /restaurants/:id                            Muestra detalles del restaurante.
4       get     /restaurants/favs                           Muestra la lista de restaurantes favoritos.
5       post    /restaurants/favs/add/:id                   Añade un restaurante a la lista de favoritos.
6       get     /restaurants/favs/delete?:id=xxx            Elimina restaurante de la lista de favoritos.
7       get     /restaurants/wish                           Muestra la lista de restaurantes que quiero visitar.
8       post    /restaurants/wish/add/:id                   Añade un restaurante a la lista de pendientes de visitar.
9       get     /restaurants/reviews                        Muestra las opiniones dejadas en los restaurantes.
10      get     /restaurants/review/:id                     Muestra formulario para dejar una opinión del sitio.
11      post    /restaurants/review/:id                     Envía opinión del sitio a la BBDD.
12      get     /restaurants/review/delete?:id=xxx          Elimina review del restaurante.
13      get     /restaurants/route/:id                      Muestra la ruta al restaurante
14      get     /user/signup                                Muestra el formulario de registro de usuario.
15      post    /user/signup                                Añade en la BBDD el usuario registrado.
16      get     /user/login                                 Muestra el formulario para editar una montaña rusa
17      post    /user/login                                 Envía formulario de login a la BBDD.
18      get     /user/profile                               Mostrar perfil de usuario.
19      get     /user/profile/edit/:id                      Muestra formulario para editar perfil de  usuario.
20      post    /user/profile/edit/:id                      Edita la información de usuario en la BBDD.
21      get     /user/logout                                Cierra sesión de usuario.




### Developed by Elena Sánchez and Miguel Serrano.












