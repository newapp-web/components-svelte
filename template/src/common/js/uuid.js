function generateUUID() {
	let dt = new Date().getTime();
	const uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
	return uuid;
}

function generateFingerprint() {
	// 创建一个 canvas 元素
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// 绘制一些文本或图形
	ctx.textBaseline = "top";
	ctx.font = "14px Arial";
	ctx.textBaseline = "alphabetic";
	ctx.fillStyle = "#f60";
	ctx.fillRect(125, 1, 62, 20);
	ctx.fillStyle = "#069";
	ctx.fillText("Hello, world!", 2, 15);
	ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
	ctx.fillText("Hello, world!", 4, 17);

	// 获取 canvas 数据 URL
	const dataUrl = canvas.toDataURL();

	const uint8Array = new TextEncoder().encode(dataUrl.split(",")[1]);

	// 将哈希值转换为16进制字符串
	const hashArray = Array.from(new Uint32Array(uint8Array.buffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

	// 返回前32位字符
	return hashHex.substring(0, 32);
}

function getFingerprint() {
	const fingerprintKey = "webfgpkong";

	// 检查本地存储中是否存在指纹
	const storedFingerprint = localStorage.getItem(fingerprintKey);
	if (storedFingerprint) {
		return storedFingerprint;
	} else {
		// 如果本地存储中不存在指纹，则生成新的指纹并存储到本地存储中
		let newFingerprint = "";
		try {
			newFingerprint = crypto.randomUUID().replace(/-/g, "");
		} catch (error) {
			try {
				newFingerprint = generateFingerprint();
			} catch (error) {
				newFingerprint = generateUUID;
			}
		}
		localStorage.setItem(fingerprintKey, newFingerprint);
		return newFingerprint;
	}
}

export { getFingerprint };
