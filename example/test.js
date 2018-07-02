const Sapling = require('../src/sapling').app({
	port: 8082
});

Sapling.use((req,res) => {
	res.test1 = true;
})

Sapling.use((req,res) => {
	res.test2 = true;
})

Sapling.use('action', (req,res) => {
	res.test3 = 'action';
	return true;
})

Sapling.use((req,res) => {
	res.test4 = true;
})

Sapling.use('action2', (req,res) => {
	res.test5 = 'action2';
	return true;
})

Sapling.use('disconnect', (req,res) => {
	res = { message: 'You\'re not welcome here!' };
	req.client.close();
	return true;
})

Sapling.use((req,res) => {
	res.test6 = 'fallback';
	return true;
})

console.log(Sapling);

console.log(Sapling.findRoute('action'));
console.log(Sapling.findRoute('action2'));
console.log(Sapling.findRoute('none'));
console.log(Sapling.findRoute(''));
