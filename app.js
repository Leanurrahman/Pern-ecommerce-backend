const express = require('express');
const fs = require('node:fs');




const app = express();

app.use(express.json());


app.get('/categories', (req, res) => {
    const data = fs.readFileSync('data.json', 'utf-8');
    const jsonData = JSON.parse(data);

    res.json(jsonData);
});

app.post('/categories', (req, res) => {
    const category = req.body;
    console.log('categories', category)
    const data = fs.readFileSync('data.json', 'utf-8');//data read
    const jsonData = JSON.parse(data);
    jsonData.categories.push(category);
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
    res.status(201).json({ message: 'Category created' });
});

app.patch('/categories/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body; // যে ফিল্ডগুলো আপডেট করতে চাও

  try {
    // 1. data.json পড়ো
    const data = fs.readFileSync('data.json', 'utf-8');
    let jsonData = JSON.parse(data);

    // 2. ক্যাটাগরি খুঁজো
    const index = jsonData.categories.findIndex(cat => cat.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // 3. শুধু প্রয়োজনীয় ফিল্ড আপডেট করো (name, slug, description ইত্যাদি)
    const allowedFields = ['name', 'slug', 'description', 'image_url', 'parent_id'];
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        jsonData.categories[index][field] = updates[field];
      }
    }

    // 4. updated_at আপডেট করো
    jsonData.categories[index].updated_at = new Date().toISOString().split('T')[0];

    // 5. ফাইলে লিখো
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2), 'utf-8');

    // 6. সফল রেসপন্স
    res.json({
      message: 'Category updated',
      category: jsonData.categories[index]
    });

  } catch (err) {
    console.error('PATCH error:', err.message);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/categories/:id', (req, res) => {
    id = parseInt(req.params.id);
    const data = fs.readFileSync('data.json', 'utf-8');//data read
    const jsonData = JSON.parse(data);
    jsonData.categories = jsonData.categories.filter(category => category.id !== id);
     fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

