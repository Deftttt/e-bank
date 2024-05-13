import { Chip } from "@mui/material";
import { LoanStatus } from "../services/LoanService";
import { lightGreen } from "@mui/material/colors";
import { lightBlue} from "@mui/material/colors";

const LoanStatusChip = ({ status }: {status: LoanStatus}) => {
    const getStatusChip = (status: LoanStatus) => {
        switch (status) {
            case 'APPROVED':
                return <Chip label="Approved" style={{backgroundColor: lightGreen[500]}}/>;
            case 'DENIED':
                return <Chip label="Denied" color="warning" />;
            case 'REJECTED':
                return <Chip label="Rejected" color="error" />;
            case 'ACCEPTED':
                return <Chip label="Accepted" color="success" />;
            case 'REQUESTED':
                return <Chip label="Requested" style={{backgroundColor: lightBlue[300]}} />;
        }
    };

    return getStatusChip(status);
};

export default LoanStatusChip;