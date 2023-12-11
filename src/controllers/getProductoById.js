const {Producto, Categoria}=require("../DB_connection");




const getProductoById = async (req, res) => {
    const idRequerido = req.params.id;
   
    try{
        const productoEncontrado = await Producto.findOne({
            where: {id : idRequerido }
        })

        return res.status(200).json(productoEncontrado); 
    } catch (error) {
        res.status(404).json(error.message)
    }
   
}

module.exports = getProductoById;


