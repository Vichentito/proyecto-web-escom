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
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.FileWriter;
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
public class borrar extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ruta = request.getRealPath("/");
        String id = request.getParameter("id");
        System.out.println("Eliminar " + id);
        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Access-Control-Allow-Origin", "*");
        SAXBuilder builder = new SAXBuilder();
        File xmlFile = new File(ruta + "preguntas.xml");
        boolean mk = true;
        if (!xmlFile.exists()) {
            mk = CrearXML(request);
        }
        try {
            PrintWriter out = response.getWriter();
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();
            List list = rootNode.getChildren("pregunta");
            int nop = list.size();
            Element elBorrar = new Element("pregunta");
            for (Object node : list) {
                Element elemento = (Element) node;
                if (elemento.getAttributeValue("id").toString().equals(id.toString())) {
                    elBorrar = elemento;
                }
            }
            if (elBorrar.hasAttributes()) {
                rootNode.removeContent(elBorrar);
            }
            list = rootNode.getChildren("pregunta");
            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(ruta + "preguntas.xml");
            xmlOutput.output(document, writer);
            writer.flush();
            writer.close();
            out.println("OK");
            //response.sendRedirect("/Prf/ServletLeerPreguntas");

        } catch (JDOMException ex) {

        }
    }

    public boolean CrearXML(HttpServletRequest request) {
        boolean crear = true;
        String filePath = request.getRealPath("/");
        try {
            Element raiz = new Element("preguntas");
            Document newdoc = new Document(raiz);
            XMLOutputter fmt = new XMLOutputter();
            try (FileWriter writer = new FileWriter(filePath + "preguntas.xml")) {
                fmt.output(newdoc, writer);
                writer.flush();
                crear = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            crear = false;
        }

        return crear;
    }

}
