// ==UserScript==
// @name         Tile Layer -- Scramble
// @namespace    https://github.com/TileLayerJS/Plugins/blob/main/Scramble.user.js
// @version      0.1
// @description  Randomize grid contents
// @author       lemocha
// @match        https://tilelayerjs.github.io/TileLayer/*
// @icon         https://tilelayerjs.github.io/TileLayer/img/icon.png
// @grant        none

// @updateURL    https://github.com/TileLayerJS/Plugins/raw/master/Scramble.user.js
// @downloadURL  https://github.com/TileLayerJS/Plugins/raw/master/Scramble.user.js
// @supportURL	 https://github.com/TileLayerJS/Plugins/issues
// ==/UserScript==

(() => {
	"use strict";
	plug.infoIni("Scramble", "1.0-beta", "lemocha", "Randomize grid contents", "https://github.com/TileLayerJS/Plugins");

	plug.addButton("Grid", "Scramble", () =>
	{
		// prompt for data save
		if (!dataSaved && cfgDOM.saveNag.checked)
		{
			if (!confirm("Data is unsaved. Clear document anyways?"))
			{
				return;
			}
		}
		// randomize each tile in grid
		tiles.forEach((currentValue, index) => tileChange(index, undefined, Math.floor(Math.random() * (tileset.list.length + 1)), true));
		dataSaved = true;
	}, "Randomize grid contents");
})();
