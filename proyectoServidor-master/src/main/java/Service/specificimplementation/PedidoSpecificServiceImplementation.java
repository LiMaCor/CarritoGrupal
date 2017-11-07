package Service.specificimplementation;

import Service.genericimplementation.GenericTableService;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Julián
 */

public class PedidoSpecificServiceImplementation extends GenericTableService {

    public PedidoSpecificServiceImplementation(HttpServletRequest request) {
        super(request);
    }

}
