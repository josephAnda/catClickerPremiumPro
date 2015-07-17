(function() {

	"use strict";

	var model = {
		currentCat: null,
		cats: [{  
			name: 'Paws',
			pic: 'images/cat1.jpg',
			count: 0,
			imgURL: 'http://fakeurl1.org'
			},
			{	
			name: 'Catherine',
			pic: 'images/cat2.jpg',
			count: 0,
			imgURL: 'http://fakeurl2.org'
			},
			{
			name: 'Scratches',
			pic: 'images/cat3.jpg',
			count: 0,
			imgURL: 'http://fakeurl3.org'
			},
			{
			name: 'Meowza',
			pic: 'images/cat4.jpg',
			count: 0,
			imgURL: 'http://fakeurl4.org'
			},
			{
			name: 'Purrl',
			pic: 'images/cat5.jpg',
			count: 0,
			imgURL: 'http://fakeurl5.org'
			}
		]
	};

	var view = {
		init: function() {
			var names = controller.getNames(model.cats),
				catList = document.getElementById("catList");
				
			//stores html elements for easy access later
			this.catCount = document.getElementById("catCount");
		 	this.catName = document.getElementById("catName");
		 	this.catPic = document.getElementById("catPic");
		 	this.catURL = document.getElementById("catURL");



			addHeading(catList);
			addNames(catList, names);
			this.render();


			function addHeading(element) {
				var message = document.createTextNode('Choose a cat:'),
					p = document.createElement("p");
				element.appendChild(message);
				element.appendChild(p);

			}

			function addNames(element, data) {
				for (var i = 0; i < data.length; i++) {	
				var p = document.createElement("p"),
					br = document.createElement("br");
				p.innerHTML = data[i];
				p.id = "cat" + (i+1);
				p.className = "cats";
				element.appendChild(p);
				element.appendChild(br);
				}
			}
		},

		render: function() {
			var cats = document.getElementsByClassName('cats');
			for (var i = 0; i < cats.length; i++) {
				controller.select(cats, i)
			}
		},

		createButton: function(id, label) {
					var button = document.createElement('button');
					var text = document.createTextNode(label);
					button.appendChild(text);
					button.type = button;
					button.id = id;
					return button;
		}
	};

	var controller = {
		init: function() {
			view.init();
		},
		getNames: function(array) {
			var names = [];
			for (var i = 0; i < array.length; i++) {
				names.push(array[i].name);
			};
			return names;
		},
		getCounts: function(array) {
			var counts = [];
			for (var i = 0; i < array.length; i++) {
				counts.push(array[i].count);
			};
			return counts;
		},
		getCurrentCat: function(name_array, index) {
			return model[name_array[index].toLowerCase()];

		},

		//  Main logic of the page.  Iterates through list of cats and instructs view to render based on clicks
		select: function(node, index) {
			
			var counts = this.getCounts(model.cats),
			 	names = this.getNames(model.cats),
			 	mainView = document.getElementById('mainView');
			 	

			

			node[index].addEventListener('click', function() {  
				model.currentCat = model.cats[index];
			  	console.log(model.currentCat);
			  	model.currentCat.count++;
			  	view.catCount.innerHTML = model.currentCat.count;
			  	view.catPic.src = 'images/cat' + (index + 1) + '.jpg';
			  	view.catName.innerHTML = model.currentCat.name;
			  	view.catURL.innerHTML = model.currentCat.imgURL;
			  	
			  	var formExists = function() {
			  		return document.getElementsByTagName('form').length != 0;
			  	}
			  	var buttonExists = function() {
			  		return document.getElementById('admin')
			  	}
			  	//  The logic below ensures that the form elements aren't duplicated
			  	var addAdminButton = (function() {
				  	if ((!buttonExists()) && (!formExists())) {
				  		mainView.appendChild(view.createButton('admin', 'Admin'));
					  	var admin = document.getElementById('admin');
					  	admin.onclick = function() {
						var form = document.createElement('form'),
						    currentName = view.catName.innerHTML,
						    currentURL = view.catURL.innerHTML,
						    currentCount = view.catCount.innerHTML;


							mainView.removeChild(admin);
							createField('name', 'Name', currentName);
							createField('count', 'Click Count', currentCount);
							createField('imgURL', 'Image URL (fake)', currentURL);
							
							form.appendChild(view.createButton('save', 'Save'));
							form.appendChild(view.createButton('cancel','Cancel'));
							
							catView.appendChild(form);
							var saveButton = document.getElementById('save'),
							    cancelButton = document.getElementById('cancel');
							var removeChildren = function(node_id) {
								var myNode = document.getElementById(node_id);
								while (myNode.firstChild) {
	   									myNode.removeChild(myNode.firstChild);
									}
							}
							saveButton.onclick = function() {
								alert('saved!');

							}
							cancelButton.onclick = function() {
								alert('cancelled!');
								removeChildren('catView');
								removeChildren('catList');
								view.init();
								return false;
							}

							
							

							form.onsubmit = function() {
									//alert('default prevented');
									//alert(document.getElementById('name').value);
									//TODO so currently the name is being changed but not the key, so the changed cat throws an error when referenced
									/*
									newName = document.getElementById('name').value;
									model[newName] = model[currentCat];
									delete model[currentCat];
									*/
									model.currentCat.name = document.getElementById('name').value; 
									//currentCat.count = document.getElementById('count').value;
									model.currentCat.imgURL = document.getElementById('imgURL').value;
									removeChildren('catList');
									view.init();
									return false;
							}

							function createField(fieldId, fieldLabel, currentValue) {
								var input = document.createElement('input');
								var label = document.createElement('label');
								var content = document.createTextNode(fieldLabel);
								var br = document.createElement('br')
								input.type = "text";
								//Why doesn't the assignment below do anything?
								input.id = fieldId;
								//label.for = fieldId;

								input.value = currentValue;
								label.appendChild(content);
								form.appendChild(label);
								form.appendChild(input);
								form.appendChild(br);
							}
						}
					}
				})()
		  	}, false);
		}
	};
	controller.init();
	
	
})()