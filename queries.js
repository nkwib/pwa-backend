const Pool = require('pg').Pool;

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: '',
    password: '',
    port: 5432,
});

const getFoods = (request, response) => {
    pool.query('SELECT * FROM menu_items ORDER BY dish_name ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getFoodById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM menu_items WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createFood = (request, response) => {
    const { name, email } = request.body;

    pool.query('INSERT INTO menu_items (name) VALUES ($1)', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Item added with ID: ${result.insertId}`)
    })
};

const updateFood = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body

    pool.query(
        'UPDATE menu_items SET name = $1 WHERE id = $3',
        [name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Item modified with ID: ${id}`)
        }
    )
}

const deleteFood = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM menu_items WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Item deleted with ID: ${id}`)
    })
};

module.exports = {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
};