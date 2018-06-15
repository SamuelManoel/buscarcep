public Autor retrieve(int id){

    try{

        Connection con = ConexaoDB.getConexao(); 

        String sql = "SELECT * FROM ator where id= ?";
        PreparedStatement ps = con.PreparedStatement(sql);
        
        ps.SetString(1,id);
        ResultSet rs = ps.executeQuery();

        Autor autor = null;
            if(rs.next()){
                autor = new Autor();
                autor = SetId(rs.getInt("id"));
                autor = SetNome(rs.getString("nome"));
                autor = SetEmail(rs.getString("email"));
                autor = SetTelefone(rs.getString("telefone"));
            }

            ps.close();
            con.close();
            return autor;

    }
}