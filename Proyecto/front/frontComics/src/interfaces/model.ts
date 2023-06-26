//Aquí se crean los modelos que se necesitan para la aplicación.

export interface ComicI{
    id?: number;
    title: string;
    author: string;
    cover: string;
    company: string;
    description: string;
    year: number;
    price: number;
}

// // El código que has proporcionado define una interfaz en TypeScript llamada ComicI. Las interfaces en TypeScript se utilizan para definir la estructura de un objeto
//  y los tipos de datos de sus propiedades. 
// En este caso, la interfaz ComicI define las propiedades y tipos de datos esperados para representar un objeto que representa un cómic.

// // Aquí está la explicación de cada propiedad de la interfaz ComicI:

// // id?: number;: Esta propiedad es opcional (? indica que es opcional).
//  Se espera que sea un número y representa el identificador único del cómic.

// // title: string;: Esta propiedad es obligatoria. Se espera que sea una cadena de texto (string) y representa el título del cómic.

// // author: string;: Esta propiedad es obligatoria. Se espera que sea una cadena de texto (string) y representa el autor o autores del cómic.

// // cover: string;: Esta propiedad es obligatoria. Se espera que sea una cadena de texto (string) y representa la URL o la ruta de la imagen de portada del cómic.

// // company: string;: Esta propiedad es obligatoria. Se espera que sea una cadena de texto (string) y representa la editorial o compañía que publica el cómic.

// // En resumen, la interfaz ComicI define la estructura y los tipos de datos esperados para representar un objeto que contiene información sobre un cómic, 
// como su título, autor, imagen de portada y compañía editorial. Esta interfaz se puede utilizar para garantizar la consistencia y validar los datos
//  cuando se trabaja con objetos de cómics en TypeScript.