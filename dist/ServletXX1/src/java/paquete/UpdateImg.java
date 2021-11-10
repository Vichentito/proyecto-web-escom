/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import java.io.File;
import java.io.FileWriter;
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
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

/**
 *
 * @author chent
 */
public class UpdateImg extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ruta = request.getRealPath("/");
        String id = request.getParameter("username");
        String imgname = request.getParameter("imgname");
        System.out.println("actualizar img");
        System.out.println("Actualizar: " + id + " " + imgname);
        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Access-Control-Allow-Origin", "*");
        SAXBuilder builder = new SAXBuilder();
        File xmlFile = new File(ruta + "archivoXML.xml");
        try {
            PrintWriter out = response.getWriter();
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();
            List list = rootNode.getChildren("usuario");
            int nop = list.size();
            for (int i = 0; i < nop; i++) {
                Element node = (Element) list.get(i);
                if (node.getAttributeValue("username").toString().equals(id.toString())) {
                    node.getAttribute("imgname").setValue(imgname);
                }
            }
            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(ruta + "archivoXML.xml");
            xmlOutput.output(document, writer);
            writer.flush();
            writer.close();
            out.println("OK");
            out.println(imgname);

            //response.sendRedirect("/Prf/ServletLeerPreguntas");
        } catch (JDOMException ex) {
        }
    }
}
