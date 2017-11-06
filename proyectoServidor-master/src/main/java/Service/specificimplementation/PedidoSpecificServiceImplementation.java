/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service.specificimplementation;

import Service.genericimplementation.GenericTableService;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Kysuke
 */
public class PedidoSpecificServiceImplementation extends GenericTableService {

    public PedidoSpecificServiceImplementation(HttpServletRequest request) {
        super(request);
    }

}
