"use strict";

(function () {
	const opts = {};
	let progressPanel = null, progressStr1 = null, progressStr2 = null, progressStr3 = null;
	let progressBarOuter = null, progressBarInner = null, cancelButton = null, currentXHR = null;

	const LOADING_ICON_SRC = "data:image/png;base64,iVBORw0KGgoAAAANS..."; // Truncated for brevity

	const makePatternA = (domain) => (cid, path) => `https://${domain}/ipfs/${cid}/${path}`;
	const makePatternB = (domain) => (cid, path) => `https://${cid}.ipfs.${domain}/${path}`;

	const IPFS_GATEWAYS = [
		makePatternA("gateway.ipfs.io"), makePatternB("4everland.io"), makePatternB("dweb.link"),
		makePatternA("cloudflare-ipfs.com"), makePatternB("cf-ipfs.com"),
		makePatternA("w3s.link"), makePatternA("storry.tv"), makePatternB("nftstorage.link")
	];

	async function tryDecompressDownload(arrayBufferIn) {
		try {
			const ds = new DecompressionStream("gzip");
			const stream = new Blob([arrayBufferIn]).stream().pipeThrough(ds);
			return await new Response(stream).arrayBuffer();
		} catch (err) {
			console.error("Could not decompress file!", err);
			return null;
		}
	}

	async function tryDownloadURL(ipfsURL) {
		return new Promise((resolve) => {
			const xhr = (currentXHR = new XMLHttpRequest());
			cancelButton.disabled = false;
			cancelButton.style.display = "inline";
			xhr.open("GET", ipfsURL);
			xhr.responseType = "arraybuffer";
			xhr.onload = () => resolve(xhr.status === 200 ? xhr.response : null);
			xhr.onerror = () => resolve(null);
			xhr.onabort = () => resolve(null);
			xhr.send();
		});
	}

	async function tryDownloadClient(ipfsCID, ipfsPath) {
		for (const gateway of IPFS_GATEWAYS.sort(() => 0.5 - Math.random())) {
			const url = gateway(ipfsCID, ipfsPath);
			const data = await tryDownloadURL(url);
			if (data) {
				return opts.gzip ? await tryDecompressDownload(data) : data;
			}
			await new Promise((res) => setTimeout(res, 1000));
		}
		return null;
	}

	function loadClientFile(arrayBuffer) {
		if (progressPanel) progressPanel.remove();
		const scriptElement = document.createElement("script");
		scriptElement.type = "text/javascript";
		scriptElement.src = URL.createObjectURL(new Blob([arrayBuffer], { type: "text/javascript" }));
		document.head.appendChild(scriptElement);
	}

	async function init() {
		if (!window.__eaglercraftLoaderClient) return console.error("Missing loader client config");
		Object.assign(opts, window.__eaglercraftLoaderClient);
		const clientCIDPath = opts.path ? `${opts.cid}/${opts.path}` : opts.cid;
		const downloadedData = await tryDownloadClient(opts.cid, opts.path);
		if (downloadedData) {
			loadClientFile(downloadedData);
		} else {
			console.error("Download failed!");
		}
	}

	window.addEventListener("load", init);
})();
