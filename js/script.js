(function() {

	"use strict";

	var model = {
		currentCat: null,
		cats: [{  
			name: 'Paws',
			pic: 'images/cat1.jpg',
			count: 0,
			imgURL: 'http://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'
			},
			{	
			name: 'Catherine',
			pic: 'images/cat2.jpg',
			count: 0,
			imgURL: 'http://animalia-life.com/cat.html'
			},
			{
			name: 'Scratches',
			pic: 'images/cat3.jpg',
			count: 0,
			imgURL: 'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
			},
			{
			name: 'Meowza',
			pic: 'images/cat4.jpg',
			count: 0,
			imgURL: 'https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg'
			},
			{
			name: 'Purrl',
			pic: 'images/cat5.jpg',
			count: 0,
			imgURL: 'http://affordablecatanddoghospital.com/cat/images/stories/slide/cats-two.jpg'
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

			if (model.currentCat) {
				this.catName.innerHTML = model.currentCat.name;
			  	this.catURL.innerHTML = model.currentCat.imgURL;
			  	this.catCount.innerHTML = model.currentCat.count;
			}			

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
		//  Main logic of the page.  Iterates through list of cats and instructs view to render based on clicks
		select: function(node, index) {
			
			var counts = this.getCounts(model.cats),
			 	names = this.getNames(model.cats),
			 	mainView = document.getElementById('mainView');
	
			node[index].addEventListener('click', function() {  
				model.currentCat = model.cats[index];
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
			  	//  The logic below ensures that the form elements aren't duplicated in the event of multiple clicks
			  	var addAdminButton = function() {
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
						createField('imgURL', 'Image URL', currentURL);
						
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
							addAdminButton();
							return false;
						}
						form.onsubmit = function() {
								model.currentCat.name = document.getElementById('name').value; 
								model.currentCat.count = document.getElementById('count').value;
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
							input.id = fieldId;
							input.value = currentValue;
							label.appendChild(content);
							form.appendChild(label);
							form.appendChild(input);
							form.appendChild(br);
						}
					}
				}
				//  Adds button, which renders a form when pressed.  Form fields update based on current cat
				if ((!buttonExists()) && (!formExists())) {
			  		addAdminButton();
			  	} else if (formExists()) {
			  		document.getElementById('name').value = model.currentCat.name;
					document.getElementById('count').value = model.currentCat.count;
					document.getElementById('imgURL').value = model.currentCat.imgURL;
			  	}
		  	}, false);
		}
	};
	controller.init();
})()