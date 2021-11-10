/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import java.io.*;
import java.util.*;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
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
public class uploadFiles extends HttpServlet {

    private boolean isMultipart;
    private String filePath;
    private int maxFileSize = 150 * 1024;
    private int maxMemSize = 6 * 1024;
    private File file;

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, java.io.IOException {

        // Check that we have a file upload request
        filePath = request.getRealPath("/");
        isMultipart = ServletFileUpload.isMultipartContent(request);
        response.setContentType("text/html");
        response.addHeader("Access-Control-Allow-Origin", "*");
        java.io.PrintWriter out = response.getWriter();
        System.out.println("Hola");
        if (!isMultipart) {
            out.println("NO OK");
            return;
        }

        DiskFileItemFactory factory = new DiskFileItemFactory();

        // maximum size that will be stored in memory
        factory.setSizeThreshold(maxMemSize);

        // Location to save data that is larger than maxMemSize.
        factory.setRepository(new File(filePath));

        // Create a new file upload handler
        ServletFileUpload upload = new ServletFileUpload(factory);

        // maximum file size to be uploaded.
        upload.setSizeMax(maxFileSize);

        try {
            // Parse the request to get file items.
            List fileItems = upload.parseRequest(request);

            // Process the uploaded file items
            Iterator i = fileItems.iterator();

            while (i.hasNext()) {
                FileItem fi = (FileItem) i.next();
                if (!fi.isFormField()) {
                    // Get the uploaded file parameters
                    String fieldName = fi.getFieldName();
                    String fileName = fi.getName();
                    String contentType = fi.getContentType();
                    boolean isInMemory = fi.isInMemory();
                    long sizeInBytes = fi.getSize();

                    // Write the file
                    if (fileName.lastIndexOf("\\") >= 0) {
                        file = new File(filePath + fileName.substring(fileName.lastIndexOf("\\")));
                    } else {
                        file = new File(filePath + fileName.substring(fileName.lastIndexOf("\\") + 1));
                    }
                    fi.write(file);
                    if (contentType.equalsIgnoreCase("text/plain")) {
                        File myObj = file;
                        String datos[] = new String[2];
                        Scanner myReader = new Scanner(myObj);
                        int cont = 0;
                        while (myReader.hasNextLine()) {
                            String data = myReader.nextLine();
                            datos[cont] = data;
                            cont++;
                        }
                        myReader.close();
                        SAXBuilder builder = new SAXBuilder();
                        File xmlFile = new File(filePath + "archivoXML.xml");
                        boolean mk = true;
                        if (!xmlFile.exists()) {
                            mk = CrearXML(request);
                        }
                        Document document = (Document) builder.build(xmlFile);
                        Element rootNode = document.getRootElement();
                        Element preguntaEl = new Element("usuario");
                        preguntaEl.setAttribute("username", datos[0]);
                        preguntaEl.setAttribute("password", datos[1]);
                        preguntaEl.setAttribute("imgname", "");
                        rootNode.addContent(preguntaEl);
                        XMLOutputter xmlOutput = new XMLOutputter();
                        xmlOutput.setFormat(Format.getPrettyFormat());
                        FileWriter writer = new FileWriter(filePath + "archivoXML.xml");
                        xmlOutput.output(document, writer);
                        writer.flush();
                        writer.close();
                    }
                    out.println("OK");

                }
            }
        } catch (Exception ex) {
            System.out.println(ex);
        }

    }

    public boolean CrearXML(HttpServletRequest request) {
        boolean crear = true;
        String filePath = request.getRealPath("/");
        try {
            Element raiz = new Element("usuarios");
            Document newdoc = new Document(raiz);
            XMLOutputter fmt = new XMLOutputter();
            try (FileWriter writer = new FileWriter(filePath + "archivoXML.xml")) {
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
