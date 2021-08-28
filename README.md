# Text_to_Class

This project uses NLP to convert text to a generic data structure using BERT with a hierarchical general classifier to 
determine the fields. This code currently supports constrained data structures with limited options but is being
generalized to support more general cases and derive more complicated classes.

The intial use case is creating a generic chatbot for restaurant ordering based on a programmatic description 
of the menu items. The chatbot uses https://rasa.com/ as a front end and for basic conversational parsing but uses
the internal software for the class generation and ordering. These exapmles are still rudimentary but are functional. 
Work is being done to clean things up, generalize and add a cleaner UI. 

There are a couple of these chatbots. 

## Chipotle
This example is based on ordering chipotle with a basic description of the menu coded. This is currently running on 
a Facebook messenger or locally at http://andywag.github.io/. Thie logit for this is somewhat rudimentary currently but 
does show the logic in determining the order based on a generic entry. 

Some examples are: 
1. Order a diet coke
2. Add a steak bowl with guacamole lettuce and cheese

The cart can be viewed and cleared by (view cart and clear cart)

The base code for this operation can be found here. 
https://github.com/andywag/text_to_class/tree/master/chipotle

## McDonalds
This example was mainly selected to attempt to derive the classes based on a generic json file found on the 
internet. The class structures which the network trains to are defined based on this file. There's quite a bit of 
metaprogramming for this example so might be a bit tricky to read. 

https://github.com/andywag/text_to_class/tree/master/mcdonalds

