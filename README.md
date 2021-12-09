# App-presupuesto

Nació con el objetivo de automatizar y mejorar una tarea, que es la de calcular presupuestos. 
Muchas veces soy de tener que hacer presupuestos para saber cuanto dinero invertiré en 
distintas cosas, pero el tener que hacerlo a mano y sacar tantas cuentas, lleva bastante tiempo.
Esta App resolvió mi problema, ya que calcula automaticamente los gastos y el dinero que tendré que gastar.
También puedo ver cuanto margen de dinero me sobra y dependiendo si es poco o mucho, el color de el dinero final cambia.
Por último, permito sacar una "screenshot" del presupuesto gastado, así poder guardarlo o imprimirlo si es necesario.
Y si no estoy seguro de si gastaré cierta cantidad de dinero, o si gastaré en ciertas cosas, puedo guardar el presupuesto
como plantilla y terminarlo luego.

## Construcción 🛠️

Stack "MEAN" en Acción 😎👍

El cliente fué construido con Angular, y utilicé el sistema de rutas, reactive forms, services, pipes y los poderosos observables :D
Para otras funcionalidades, implementé librerias como html2canvas, toastr y jspdf.
Esta App también funciona como "PWA", asi que puedes instalarla en cualquier dispositivo ;)

El Backend fué construido con NodeJS y Express. Las dependencias de desarrollo que utilicé son morgan, cors y nodemon.
Puedo consumir peticiones HTTP como, get, post, put y delete.
Este servidor está conectado a Heroku y se conecta a la base de datos de MongoDB.
