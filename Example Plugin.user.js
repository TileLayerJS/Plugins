// ==UserScript==
// @name         Tile Layer -- Example Plugin
// @namespace    https://github.com/TileLayerJS/Plugins/blob/main/Example%20Plugin.user.js
// @version      0.1
// @description  Learn how to make Tile Layer plugins. Guide in userscript source code
// @author       lemocha
// @match        https://tilelayerjs.github.io/TileLayer/*
// @icon         https://tilelayerjs.github.io/TileLayer/img/icon.png
// @grant        none

// @updateURL    https://github.com/TileLayerJS/Plugins/raw/master/Example%20Plugin.user.js
// @downloadURL  https://github.com/TileLayerJS/Plugins/raw/master/Example%20Plugin.user.js
// @supportURL	 https://github.com/TileLayerJS/Plugins/issues
// ==/UserScript==

(() => {
	"use strict";
	// Welcome!
	// You should have at least some JavaScript experience before making a plugin.
	// See "https://github.com/TileLayerJS/TileLayer/wiki/Plugins" for info on the plugin API.

	// All plugins must be initialized before use
	plug.infoIni("Example Plugin",                          // name
	             "0.1",                                     // version
	             "lemocha",                                 // author
	             "Learn how to make Tile Layer plugins.  Guide in userscript source code",  // description
	             "https://github.com/TileLayerJS/Plugins"); // url

	// Let's begin by creating a button in the tool bar
	// A button with the name "Hello World" will be created in the "Settings" tab.
	// On click, it will pop up an alert box
	plug.addButton("Settings",                                  // tab
	               "Hello World",                               // display name
								 function() { alert("Hello World"); },        // function
								 "Example button that alerts Hello World.");  // description



	// Let's make a new tab
	plug.addTab("Example");  // Name & ID

	// Now, create a button in the new tab
	plug.addButton("Example",
	               "Hello World",
								 function() { alert("Hello World"); },
								 "Example button created in a custom tab");



	// Buttons can have other functions as well
	// This button will reset the selected palette tile to default
	plug.addButton("Example",
	               "Reset selected tile",
								 () => changeSelTile(0),
								 "Change selected tile to default (ID:0)");



	// We can create menus as well
	// Create a menu with ID "ExampleMenu".
	// Then, attach a button to the menu
	plug.addMenu("ExampleMenu");
	plug.addButton("menuExampleMenu", "Menu button", () => alert("This is a button in a custom menu"), "Example alert");

	// Finally, we create a button in the Example tab which will open the menu
	// menu:[menu name] function will switch tab to the menu specified
	plug.addButton("Example", "Custom menu", "menu:ExampleMenu", "");




	// Let's do a complex example
	// Let's make a menu that moves a cursor around the grid

	// Firstly, create the menu
	plug.addMenu("CursorEx");

	// Then, we create functions that our buttons will use later
	const EXcursorPos = [0, 0];
	function EXcursorMove(x, y)
	{
		// Remove previously drawn tile
		tileDraw(EXcursorPos);

		// Change cursor position
		EXcursorPos[0] += x;
		EXcursorPos[1] += y;

		// If cursor is out of bounds, correct it in bounds
		if (EXcursorPos[0] >= grid.dim[0])
		{
			EXcursorPos[0] = grid.dim[0] - 1;
		}
		if (EXcursorPos[0] < 0)
		{
			EXcursorPos[0] = 0;
		}
		if (EXcursorPos[1] >= grid.dim[1])
		{
			EXcursorPos[1] = grid.dim[1] - 1;
		}
		if (EXcursorPos[1] < 0)
		{
			EXcursorPos[1] = 0;
		}
		console.log(EXcursorPos);

		// Draw cursor as red box over tile
		ctx.grid.fillStyle = "red";
		ctx.grid.fillRect(EXcursorPos[0] * 32 + 12, EXcursorPos[1] * 32 + 12, 8, 8);
	}

	plug.addButton("menuCursorEx", "<-", () => EXcursorMove(-1, 0), "Move grid cursor left");
	plug.addButton("menuCursorEx", "^", () => EXcursorMove(0, -1), "Move grid cursor up");
	plug.addButton("menuCursorEx", "->", () => EXcursorMove(1, 0), "Move grid cursor right");
	plug.addButton("menuCursorEx", "v", () => EXcursorMove(0, 1), "Move grid cursor down");
	menu.CursorEx.appendChild(document.createElement("br"));
	plug.addButton("menuCursorEx", "Pick at Cursor", () =>
	{
		// Change selected tile to one at cursor position
		changeSelTile(grid.atPosition(EXcursorPos));

		// If custom setting checked (tutorial later)
		if (cfgDOM.exCursorAlert.checked)
		{
			// show alert box
			alert(`Tile at (${EXcursorPos}): ${tileset.name[grid.atPosition(EXcursorPos)]} (id:${tileset.list[grid.atPosition(EXcursorPos)]})`);
		}
	}, "Get tile at grid cursor location");

	// Again, create a button in the toolbar that opens the menu
	plug.addButton("Example", "Cursor", "menu:CursorEx", "Move a cursor around the grid");


	// In our cursor pick button, a setting was used to determine whether to alert the user or not
	// You can create settings
	// NOTE: settings creation subject to change

	// New settings tab
	cfgIni.header("Example");                        // name & ID

	// Visual category text
	cfgIni.text("Cursor");                           // Visual category text

	// New setting
	cfgIni.create("Alert on cursor pick",            // name
	              "exCursorAlert",                   // ID
								"checkbox",                        // type (checkbox, input, number, select)
								true,                              // default value
								"Show alert box on cursor pick");  // description
								// also: select value list goes here if type is select (format = [name, id, name, id...])

	// Like shown above, this setting can be accessed at cfgDOM.exCursorAlert


	// That's it! You now know how to make Tile Layer plugins.
	// While testing, make sure to check the browser console / Inspect menu (Shift+Ctrl+I) for any warnings or errors.
})();
