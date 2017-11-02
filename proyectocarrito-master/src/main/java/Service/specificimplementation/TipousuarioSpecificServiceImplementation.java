/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Service.specificimplementation;

/**
 *
 * @author Kysuke
 */
import Service.genericimplementation.GenericTableService;
import javax.servlet.http.HttpServletRequest;

public class TipousuarioSpecificServiceImplementation extends GenericTableService {

    public TipousuarioSpecificServiceImplementation(HttpServletRequest request) {
        super(request);
    }

}
