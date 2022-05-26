import { RBACWrapper } from 'react-simple-rbac';
import { Role } from '../model/enums/role.enum';

const AdminPanel = () => {
  return (
    <div>
      <RBACWrapper requiredRoles={[Role.ADMIN]}>
        <div>Admin panel</div>
      </RBACWrapper>
    </div>
  );
};

export default AdminPanel;
