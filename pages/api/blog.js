
export default (req, res) => {
  if (!req.method === "POST") {
    res.status(405).end();
    return
  }

  const { name, email, blogurl, feedurl, notes } = req.body;

  const Airtable = require('airtable');
  const base = new Airtable({apiKey: process.env.APIKEY}).base('apphC2ILhZZh52WxF');
  base('Table 1').create([
    {
      "fields": { name, email, blogurl, feedurl, notes }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });

  res.json({
    success: true,
  })
}
