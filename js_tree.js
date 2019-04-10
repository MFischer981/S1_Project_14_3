"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: 
   Date:   

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

// Sets global variables t count the total number of nodes within the document.
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

// When the page loads run the makeTree function.
window.onload = makeTree;
// In this function the nodes are created and appended to the document..
function makeTree() {
	var aside = document.createElement("aside");
	aside.id = "treeBox";
	aside.innerHTML = "<h1>Node Tree</h1>";

	var sectionMain = document.getElementById("main");
	sectionMain.appendChild(aside);

	var nodeList = document.createElement("ol");
	aside.appendChild(nodeList);

	var sourceArticle = document.querySelector("#main article");
	// This calls the make branch function using the sourceArticle and nodeList parameters.
	makeBranches(sourceArticle, nodeList);
	// Get elements by their ID and sets the text content to the nodeCount, elementCount, textCount and white space count.
	document.getElementById("totalNodes").textContent = nodeCount;
	document.getElementById("elemNodes").textContent = elemCount;
	document.getElementById("textNodes").textContent = textCount;
	document.getElementById("wsNodes").textContent = wsCount;

}
// In the makeBranches function the code loops through the page's nodes and displays them nested within each other. This starts with tht root nodes then loops through the child nodes in order to generate them as if they were HTML.
function makeBranches(treeNode, nestedList) {
	nodeCount++;
	var liElem = document.createElement("li");
	liElem.innerHTML = ("+--");

	var spanElem = document.createElement("span");
	liElem.appendChild(spanElem);
	nestedList.appendChild(liElem);

	if (treeNode.nodeType === 1) {
		elemCount++;
		spanElem.setAttribute("class", "elementNode");
		spanElem.textContent = "<" + treeNode.nodeName + ">";
	} else if (treeNode.nodeType === 3) {
		textCount++;
		var textString = treeNode.nodeValue;

		if (isWhiteSpaceNode(textString)) {
			wsCount++;
			spanElem.setAttribute("class", "whiteSpaceNode");
			spanElem.textContent = "#text";
		} else {
			spanElem.setAttribute("class", "textNode");
			spanElem.textContent = textString;
		}
	}

	if (treeNode.childNodes.length > 0) {
		var newList = document.createElement("ol");
		newList.innerHTML = "|";
		nestedList.appendChild(newList);
		for (var n = treeNode.firstChild; n != null; n = n.nextSibling) {
			makeBranches(n, newList);
		}
	}
}

// This function test if a string of text is white space or not.
function isWhiteSpaceNode(tString) {
	return !(/[^\t\n\r ]/.test(tString));
}