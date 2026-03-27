const { client } = require('./src/client.js');

async function debugPosts() {
  try {
    console.log('Testing Sanity connection...');
    
    // Test 1: Check if we can connect to Sanity
    const connectionTest = await client.fetch('*[_type == "post"][0]{title, slug}');
    console.log('Connection test result:', connectionTest);
    
    // Test 2: Get all posts (limited to 5)
    const allPosts = await client.fetch('*[_type == "post"][0...5]{title, slug, publishedAt}');
    console.log('All posts found:', allPosts);
    
    // Test 3: Get blog posts specifically
    const blogPosts = await client.fetch('*[_type == "post" && lower(categories[0]->title) match "*blog*"][0...5]{title, slug, publishedAt}');
    console.log('Blog posts found:', blogPosts);
    
    // Test 4: Check categories
    const categories = await client.fetch('*[_type == "category"][0...5]{title, slug}');
    console.log('Categories found:', categories);
    
  } catch (error) {
    console.error('Debug error:', error.message);
  }
}

debugPosts();
