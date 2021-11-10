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
public class leer extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ruta = request.getRealPath("/");
        String queryStr = request.getQueryString();
        File xmlFile = new File(ruta + "/preguntas.xml");
        SAXBuilder builder = new SAXBuilder();
        boolean mk = true;
        if (!xmlFile.exists()) {
            mk = CrearXML(request);
        }
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        outter = response.getWriter();
        try {
            /* TODO output your page here. You may use following sample code. */
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();
            int nop;
            List list = rootNode.getChildren("pregunta");
            StringBuilder json = new StringBuilder();
            json.append("[");
            for (Object node : list) {
                Element elemento = (Element) node;
                String id = elemento.getAttributeValue("id");
                String valores = elemento.getAttributeValue("valores");
                if (queryStr != null) {
                    //Obtener solo el nodo
                    String qId = queryStr.split("=")[1];
                    if (id.equals(qId)) {
                        json.append("{");
                        json.append(jsonValue("id", id)).append(",");
                        json.append(jsonValue("valores", valores));
                        json.append("}");
                    }
                } else {
                    json.append("{");
                    json.append(jsonValue("id", id)).append(",");
                    json.append(jsonValue("valores", valores));
                    json.append("}");
                    if (list.indexOf(node) != list.size() - 1) {
                        json.append(",");
                    }
                }

            }
            json.append("]");
            //System.out.println(json.toString());
            outter.write(json.toString());
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
    
    private String convertToJsonArray(String key, List list) {
        StringBuilder jsonArray = new StringBuilder();
        jsonArray.append("\"").append(key).append("\" : [");
        int count = 1;
        for (Object item : list) {
            Element option = (Element) item;
            String imagen = option.getAttributeValue("IMAGEN");
            String value = option.getText();
            jsonArray
                    .append("{")
                    .append(jsonValue("imagen", imagen))
                    .append(",")
                    .append(jsonValue("valor", value))
                    .append("}");
            if (count < list.size()) {
                jsonArray.append(",");
            }
            count++;
        }
        jsonArray.append("]");
        return jsonArray.toString();
    }

    private String jsonValue(String key, Object value) {
        return new StringBuilder()
                .append("\"")
                .append(key)
                .append("\" : \"")
                .append(value)
                .append("\"")
                .toString();
    }
}
