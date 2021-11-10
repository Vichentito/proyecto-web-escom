package paquete;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class ServletX1 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain;charset=UTF-8");
        response.addHeader("Access-Control-Allow-Origin", "*");
        request.setCharacterEncoding("UTF-8");
        String ruta = request.getRealPath("/");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        PrintWriter out = response.getWriter();
        //out.print("<link rel = 'stylesheet' href = 'estilos.css'>");
        try {
            SAXBuilder builder = new SAXBuilder();
            File archivoXML = new File(ruta + "\\archivoXML.xml");
            Document documento = builder.build(archivoXML);
            Element raiz = documento.getRootElement();
            List lista = raiz.getChildren("usuario");
            boolean bandera = false;
            String imgName = "";
            for (int i = 0; i < lista.size(); i++) {
                Element elemento = (Element) lista.get(i);
                String usernamexml = elemento.getAttributeValue("username");
                String passwordxml = elemento.getAttributeValue("password");
                if (username.compareTo(usernamexml) == 0 && password.compareTo(passwordxml) == 0) {
                    imgName = elemento.getAttributeValue("imgname");
                    bandera = true;
                }
                System.out.println(username+" "+password+" ");
                System.out.println(usernamexml+" "+passwordxml+" "+bandera);
            }
            if(bandera){
                out.println("login");
                out.println(imgName);
            }else{
                out.println("http://localhost:8080/ServletXX1/error.html");
            }
        } catch (JDOMException e) {
            e.printStackTrace();
        }

    }
}
