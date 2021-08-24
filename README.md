# Text_to_Class

This project is an experiment in using NLP to convert text from a class to an internal data structure. The intial use case is creating a generic 
chatbot for ordering based on a programmatic description of items or a list defined in JSON. The first application tried was to create a chatbot for 
restaraunt ordering given the small syntax and relatively simple logic requiremnents for ordering. 

There are a couple of examples of this method.
## Chipotle
This example is at a more advanced state and includes a chatbot which 
is running on Faceboook using RASA. The Facebook page is not publicly accesible yet but can be exposed if there is interest. 

https://github.com/andywag/text_to_class/tree/master/chipotle

## McDonalds
This example was mainly selected to attempt to derive the classes based on 
a generic json file found on the internet. The class structures which the 
network trains to are defined based on this file. 

https://github.com/andywag/text_to_class/tree/master/mcdonalds

