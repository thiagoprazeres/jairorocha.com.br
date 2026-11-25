const { getStore } = require('@netlify/blobs');
const { writeFile } = require('node:fs/promises');
const { createHash } = require('node:crypto');

exports.onPreBuild = async () => {
  const store = getStore({ name: 'catalogo-portal', consistency: 'strong' });
  const data = await store.get('imoveis');
  if (!data || !JSON.parse(data).length) throw new Error('Catálogo ausente no Netlify Blobs.');
  await writeFile('.catalogo.json', data);
  await writeFile('public/catalogo-versao.txt', createHash('sha256').update(data).digest('hex'));
};
