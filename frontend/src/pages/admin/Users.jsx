import { useState, useEffect } from 'react';
import { FiUser, FiTrash2, FiSearch, FiMail, FiPhone, FiCheckCircle, FiMoreVertical } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        try {
            const { data } = await axios.get(API_URL, config);
            setUsers(data);
        } catch (err) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        try {
            await axios.delete(`${API_URL}/${id}`, config);
            toast.success('User removed');
            fetchUsers();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete user');
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800">User Management</h1>
                    <p className="text-slate-500 font-medium text-sm md:text-base">Manage farmers, buyers, and administrators.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all text-slate-700 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-3xl animate-pulse" />)}
                </div>
            ) : (
                <>
                    {/* Desktop View (Table) */}
                    <div className="hidden md:block bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">User</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Role</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredUsers.map(user => (
                                        <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{user.name}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {user._id.slice(-6)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                    user.role === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' :
                                                    user.role === 'farmer' ? 'bg-emerald-100 text-emerald-700' :
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                    {user.role === 'admin' && <FiCheckCircle />}
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="space-y-1">
                                                    <p className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                                        <FiMail className="text-slate-400" /> {user.email}
                                                    </p>
                                                    {user.phone && (
                                                        <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                                            <FiPhone className="text-slate-300" /> {user.phone}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                {user.role !== 'admin' && (
                                                    <button 
                                                        onClick={() => handleDelete(user._id)}
                                                        className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View (Cards) */}
                    <div className="md:hidden space-y-4">
                        {filteredUsers.map(user => (
                            <div key={user._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                                    user.role === 'admin' ? 'bg-indigo-600' :
                                    user.role === 'farmer' ? 'bg-emerald-500' :
                                    'bg-slate-300'
                                }`} />
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xl">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 leading-tight">{user.name}</h3>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                                                user.role === 'admin' ? 'text-indigo-600' :
                                                user.role === 'farmer' ? 'text-emerald-600' :
                                                'text-slate-400'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                    {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            className="p-3 bg-rose-50 text-rose-600 rounded-2xl"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-2 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                            <FiMail size={14} />
                                        </div>
                                        {user.email}
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                                <FiPhone size={14} />
                                            </div>
                                            {user.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiUser className="text-3xl text-slate-300" />
                            </div>
                            <h3 className="text-lg font-black text-slate-400">No users found</h3>
                            <p className="text-slate-400 text-sm">Try using different search keywords.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminUsers;
