// ==UserScript==
// @name         Tile Layer -- Debug Utils
// @namespace    https://github.com/TileLayerJS/Plugins/Debug%20Utils.user.js
// @version      1.0-beta
// @description  Debugging tools for Tile Layer. Enable debugging in settings to use. NOTE: Some buttons clear document without warning.
// @author       lemocha
// @match        https://tilelayerjs.github.io/TileLayer/*
// @icon         https://tilelayerjs.github.io/TileLayer/img/icon.png
// @grant        GM.registerMenuCommand
// @run-at       document-end

// @updateURL    https://github.com/TileLayerJS/Plugins/raw/master/Debug%20Utils.user.js
// @downloadURL  https://github.com/TileLayerJS/Plugins/raw/master/Debug%20Utils.user.js
// @supportURL	 https://github.com/TileLayerJS/Plugins/issues
// ==/UserScript==

(() => {
	plug.infoIni("Debug Utils", "1.0-beta", "lemocha", "Debugging tools for Tile Layer. Enable debugging in settings to use.\nNOTE: Some buttons clear document without warning.", "https://github.com/TileLayerJS/Plugins");

	if (debug)
	{
		GM.registerMenuCommand("makeGrid()", () => makeGrid());
		GM.registerMenuCommand("drawGrid()", () => drawGrid());
		GM.registerMenuCommand("makePalette()", () => makePalette());
		GM.registerMenuCommand("makePreview()", () => makePreview());
		GM.registerMenuCommand("pixel.check()", () => pixel.check());

		plug.addTab("Debug");
		plug.addButton("Debug", "Manual Tileset Change", () => changeTiles(prompt("Enter tileset ID", tileset.group)), "Set tileset ID to prompt string");
		plug.addButton("Debug", "Change Menu", () => changeMenu(prompt("Input menu ID", currentMenu)), "Go to menu specified by prompt");


		// create import type
		let btn = document.createElement("button");
		btn.classList = "btnPlug";
		btn.onclick = () => tilaImport("tila", prompt("Enter TILA data"));
		btn.appendChild(document.createTextNode("TILA (text)"));
		menu.Import.appendChild(document.createElement("br"));
		menu.Import.appendChild(btn);

		// create export type
		btn = document.createElement("button");
		btn.classList = "btnPlug";
		btn.onclick = () => exportShow(tilaExport("tila"), undefined, 100, 20);
		btn.appendChild(document.createTextNode("TILA (text)"));
		menu.Export.appendChild(document.createElement("br"));
		menu.Export.appendChild(btn);
	}
})();
