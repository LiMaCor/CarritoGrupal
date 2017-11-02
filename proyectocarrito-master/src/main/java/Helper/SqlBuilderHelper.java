/*
 * Copyright (c) 2017 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 *
 * generic-carrito-server: Helps you to develop easily AJAX web applications
 *               by copying and modifying this Java Server.
 *
 * Sources at https://github.com/rafaelaznar/generic-carrito-server
 *
 * generic-carrito-server is distributed under the MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package Helper;

import static java.lang.Math.ceil;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

public class SqlBuilderHelper {

    public static String buildSqlFilter(ArrayList<FilterBeanHelper> alFilter) {
        String strSQLFilter = "";
        Iterator it = alFilter.iterator();
        while (it.hasNext()) {
            FilterBeanHelper oFilterBean = (FilterBeanHelper) it.next();
            strSQLFilter += getFilterExpression(oFilterBean);
        }
        return strSQLFilter;
    }

    private static String getFilterExpression(FilterBeanHelper temp) {

        switch (temp.getOperation()) {
            case "like": //like
                return temp.getLink() + " " + temp.getField() + " LIKE '%" + temp.getValue() + "%' ";
            case "nlik": //not like
                return temp.getLink() + " " + temp.getField() + " NOT LIKE '%" + temp.getValue() + "%' ";
            case "star": //starts with
                return temp.getLink() + " " + temp.getField() + " LIKE '" + temp.getValue() + "%' ";
            case "nsta": //not starts with
                return temp.getLink() + " " + temp.getField() + " NOT LIKE '" + temp.getValue() + "%' ";
            case "ends": //ends with
                return temp.getLink() + " " + temp.getField() + " LIKE '%" + temp.getValue() + "' ";
            case "nend": //not ends with
                return temp.getLink() + " " + temp.getField() + " NOT LIKE '%" + temp.getValue() + "' ";
            case "equa": //equal
                return temp.getLink() + " " + temp.getField() + " = " + temp.getValue() + " ";
            case "nequ": //not equal
                return temp.getLink() + " " + temp.getField() + " != " + temp.getValue() + " ";
            case "lowe": //lower than
                return temp.getLink() + " " + temp.getField() + " < " + temp.getValue() + " ";
            case "lequ": //lower or equal than
                return temp.getLink() + " " + temp.getField() + " <= " + temp.getValue() + " ";
            case "grea": //greater than
                return temp.getLink() + " " + temp.getField() + " > " + temp.getValue() + " ";
            case "gequ": //greater or equal than
                return temp.getLink() + " " + temp.getField() + " >= " + temp.getValue() + " ";
            default:
                throw new Error("Filter expression malformed. Operator not valid.");
        }
    }

    public static String buildSqlLimit(Long intTotalRegs, Integer intRegsPerPage, Integer intPageNumber) {
        String SQLLimit = "";
        if (intRegsPerPage > 0 && intRegsPerPage < 10000) {
            if (intPageNumber > 0 && intPageNumber <= (ceil((intTotalRegs / intRegsPerPage) + 1))) {
                SQLLimit = " LIMIT " + (intPageNumber - 1) * intRegsPerPage + " , " + intRegsPerPage;
            } else {
                SQLLimit = " LIMIT 0 ";
            }
        }
        return SQLLimit;
    }

    public static String buildSqlOrder(LinkedHashMap<String, String> hmOrder) {
        String strSQLOrder = "";
        if (hmOrder != null) {
            for (Map.Entry<String, String> entry : hmOrder.entrySet()) {
                strSQLOrder += entry.getKey();
                strSQLOrder += " ";
                strSQLOrder += entry.getValue();
                strSQLOrder += ",";
            }
            strSQLOrder = " ORDER BY " + strSQLOrder.substring(0, strSQLOrder.length() - 1);
        }
        return strSQLOrder;
    }

}
