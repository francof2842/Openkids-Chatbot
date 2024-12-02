const systemMessageContent = `
Eres un asistente virtual para un servicio de alquiler de fiestas infantiles. Tu única fuente de información es un documento específico proporcionado por el administrador. Tu función principal es responder preguntas de manera precisa y clara, basándote exclusivamente en los datos contenidos en ese documento. Aquí están las instrucciones clave para tu comportamiento:

Restringe tu conocimiento: No puedes inventar información ni responder basándote en conocimientos externos a lo que contiene el documento. Si no encuentras una respuesta en el documento, debes decir algo como: "Lo siento, no tengo esa información disponible en este momento. ¿Deseas que te comunique con un agente para obtener más ayuda?"

Tono y estilo: Responde de manera amigable, profesional y sencilla, ideal para padres y clientes que buscan información sobre alquileres de fiestas infantiles.

Claridad y brevedad: Responde de forma directa, evitando redundancias, pero asegurándote de que las respuestas sean comprensibles.

Funciones principales:

Proveer información sobre los servicios de alquiler (equipos, paquetes, precios, duración, etc.).
Explicar el proceso de reserva o contratación.
Responder preguntas frecuentes que puedan estar en el documento.
Informar sobre políticas de cancelación, cambios o devoluciones.
Errores y falta de información: Si alguien pregunta algo que no está en el documento, no intentes inferir o adivinar. Responde siempre indicando que la información no está disponible y ofrece contactar con un agente para asistencia adicional.

Ejemplo de respuesta: "Lo siento, no tengo información sobre eso en este momento. ¿Deseas que te comunique con un agente para que te ayude con más detalles?"
Comunicación con un agente: Si el cliente solicita comunicarse con un agente, responde confirmando y proporciona los pasos necesarios para establecer contacto. Por ejemplo:

"Claro, te pondré en contacto con un agente de nuestro equipo. Por favor, espera un momento mientras gestiono tu solicitud."
O, si corresponde, proporciona información adicional, como un número de teléfono o un enlace de chat en vivo.
Actualizaciones: No respondas a preguntas relacionadas con actualizaciones futuras del servicio o cambios a menos que estén explícitamente detalladas en el documento.

Cumple estrictamente estas instrucciones y prioriza la experiencia del cliente en cada interacción.
`;

const knowledgeBase = `
    Bienvenida;

¡Bienvenidos a los Salones de Open kids y Abasto Kids.!Estamos felices de que hayas
contactado con nosotros. Somos expertos en hacer de las fiestas infantiles un dia
inolvidable lleno de alegria y diversion para los mas pequeños.
Ofrecemos una amplia variedad de servicios, desde decoración y animación hasta
deliciosa comidas y bebidas para niños y sus padres. Nuestro personal amigable y
profesional está aquí para ayudarte a organizar la mejor fiesta infantil posible.


Selecciona una opcion para continuar:



1 - Quiero Informacion de los Locales

1 - Cuales son los Horarios de Atencion?
Lunes a viernes. de 17 a 22 horas. Tanto por WhatsApp como personalmente en los
salones
2 - Precios y servicios para Open Kids?
Por favor ingresar a nuestro link. http://elsitio.ar/openkids
3 - Precios y servicios para Abasto Kids?
Por favor ingresar a nuestro link. http://elsitio.ar/abastokids
4 - Fotos de los salones

2 - Quiero informacion de los Cumpleaños

1 - Que incluye los cumpleaños?
Todo lo que te muestra el folleto virtual de cada salón. Animación, coordinación,
mozas, y personal cocina y tarjetas Virtuales
2 - Se puede hacer cumpleaños compartidos?
No se puede hacer cumpleaños compartidos, solo si son hermanos.
3 - Cual es el minimo de niños y adultos?
IMPORTANTE LOS NINOS PAGAN POR UN COMBO x 30 niños. LOS ADULTOS SON APARTE. NO SE COMPENSAN NIÑOS POR ADULTOS. NI ADULTOS POR NIÑOS. LOS ADULTOS PAGAN POR CADA UNO COMO DICE LA INFORMACION .
Los mínimos son 30 niños y 5 adultos días de semana y 30 niños y 10 adultos fines de
semana y feriados. Estos son mínimos de ahí para arriba puede agregar lo que
necesite. En el caso de no llegar a los minimos solicitados. Se puede comprar
servicios adicionales como ser Body Paint. Glittel Bar. Simuladores. Un(1) adicional si
no llega a los 5 adultos y DOS (2) adicionales si no llega a los 10 adultos. Si necesita menú sin TAC o cualquier otro menú adicional que no esté en la contratación. TIENE UN COSTO EXTRA (CONSULTAR)

4 - Desde que edad abonan los niños?
Los niños abonan de 1 a 12 años como niños, desde 13 para arriba abonan como adultos.
5 - Ornamentación del salón?
La decoración y el Candy Bar es sin cargo. Los papas deben llevar todos los
materiales que se necesite incluyendo globos cinta y piolines y todo lo que deseen
para decorar, 48 horas antes del evento para tener tiempo de realizarlos, el mismo
día ya no se podrá) (llevar las bolsitas armadas y cerradas como así también piñata
(sin papel picado) y centros de mesas si tuvieran ya listo para colocar). También si
necesitan descartables para que sus invitados lleven por ejemplo torta a sus casas
deben llevar todo lo que necesiten. Así cuando ustedes lleguen este todo listo para su
comodidad.

6 - Consultar disponibilidad de una fecha
Debe ingresar y abrir este link https://whatsform.com/SyQNW2
Llenarlo y enviarlo y será contestado la disponibilidad a la brevedad

7 - Necesito cambiar una fecha
Las fechas no se cambian, las señas no se devuelven, por ningún motivo, ya que esa
fecha está perdida y no se la puede vender, porque quien consulta de la fecha, les
dijimos que no la teníamos, gracias



3 - Quiero informacion de como pagar un Cumpleaños


1 - Cuales son las formas de pago?
Los precios son de contado Efectivo,
Pagos en 3 o 6 cuotas. EL DIA QUE CONTRATE EL CUMPLEAÑOS, SE ABONA EL TOTAL DE LA SIGUIENTE MANERA, se abona el 50 por ciento de la fiesta en Efectivo y el otro 50 por ciento se puede pagar con tarjeta (consultar los intereses), MESES QUE ESTAMOS TOMANDO PARA CANCELACIONES TOTALES. UNICAMENTE AGOSTO, SETIEMBRE Y OCTUBRE.

2 - Cual es la seña para contratar una fiesta?
La seña es de 60 mil pesos, congela el precio del cumpleaños y reserva la
fecha.


3 - Como hago para dejar el cumpleaños congelado en su totalidad?
Cuando va a contratar el cumpleaños, el día de la compra paga la totalidad, del
cumpleaños, de niños y adultos, así quedaría congelado, únicamente MESES
AGOSTO, SEPTIEMBRE Y OCTUBRE.
Si luego se agregan adultos o niños el día antes del cumpleaños se abona al precio
del día de la fiesta.



4 - Hasta cuando tiene que estar abonado la totalidad de la fiesta?
Debe estar abonado total 48 horas antes de realizado el mismo.


Gracias por comunicarte con nosotros, espero haber sido de ayuda para ti!
    
    `;

export { systemMessageContent, knowledgeBase };
